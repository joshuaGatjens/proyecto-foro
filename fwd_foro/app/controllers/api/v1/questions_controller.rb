# File: app/controllers/api/v1/questions_controller.rb

class Api::V1::QuestionsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_question, only: [:show, :update, :destroy, :toggle_like]
  skip_before_action :authenticate_user!

  # GET /api/v1/questions/users_by_more_questions
  # Retrieves all users ordered by the highest number of questions.
  def users_by_more_questions
    top_users = User.joins(:questions)
                   .group(:id)
                   .order('COUNT(questions.id) DESC')
                   .pluck(:id, :email, 'COUNT(questions.id) as total_questions')

    top_users_objects = top_users.map { |user| { id: user[0], email: user[1], total_questions: user[2] } }

    render json: { users_by_more: top_users_objects }
  end

  # GET /api/v1/questions/by_label?label_id=1
  # Retrieves questions associated with a specific label, including user and label details.
  def by_label
    @label = Label.find(params[:label_id])
    @questions = @label.questions.includes(:user)

    render json: @questions.as_json(
      include: {
        user: { only: [:id, :name] },
        labels: { only: [:id, :name] }
      }
    )
  end

  # GET /api/v1/questions/top_users
  # Retrieves all users ordered by the highest sum of question_points.
  def top_users
    top_users = User.joins(:questions)
                   .group(:id)
                   .order('SUM(questions.question_points) DESC')
                   .pluck(:id, :email, 'SUM(questions.question_points) as total_points')

    top_users_objects = top_users.map { |user| { id: user[0], email: user[1], total_points: user[2] } }

    render json: { top_users: top_users_objects }
  end

  # POST /api/v1/questions/toggle_like
  # Toggles the like status for a question by a user.
  def toggle_like
    @user = User.find_by(id: params[:user][:id])

    if @user&.question_liked?(@question)
      @user.unquestion_liked(@question)
      render json: { message: 'Question unliked successfully', question_points: @question.question_points }
    else
      @user.like_question(@question)
      render json: { message: 'Question liked successfully', question_points: @question.question_points }
    end
  end

  # GET /api/v1/questions
  # Retrieves a list of all questions with basic information, including user and label details.
  def index
    questions = Question.order(id: :desc).all
  
    render json: {
      questions: questions.as_json(
        only: [:id, :title, :body, :question_points],
        include: {
          user: { only: [:id, :name] },
          labels: { only: [:id, :name] }
        }
      )
    }
  end
  
  # GET /api/v1/questions/1
  # Retrieves detailed information about a specific question, including user and label details.
  def show
    if @question
      render json: @question.as_json(
        only: [:id, :title, :body, :question_points],
        include: {
          user: { only: [:id, :name] },
          labels: { only: [:id, :name] }
        }
      )
    else
      render json: { error: 'Pregunta no encontrada' }, status: :not_found
    end
  end

  # POST /api/v1/questions
  # Creates a new question based on provided parameters.
  # Request Parameters: title, body, question_points, user_id, label_ids (Array)
  def create
    @question = Question.new(question_params)

    if params[:label_ids].present?
      label_ids = params[:label_ids].split(',')
      @question.labels << Label.where(id: label_ids)
    end

    if @question.save
      render json: @question, status: :created
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/questions/1
  # Updates question information based on provided parameters.
  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/questions/1
  # Deletes a question.
  def destroy
    @question.destroy
    render json: { message: 'Question deleted successfully' }
  end

  private

  # Checks if the user is unauthenticated.
  def unauthenticated
    !user_signed_in?
  end

  # Finds and sets the @question instance variable based on the provided id.
  def set_question
    @question = Question.find(params[:id])
  end

  # Defines permitted question parameters for mass assignment.
  def question_params
    params.require(:question).permit(:title, :body, :question_points, :user_id, label_ids: [])
  end
end
