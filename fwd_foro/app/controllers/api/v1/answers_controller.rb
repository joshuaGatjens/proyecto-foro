# File: app/controllers/api/v1/answers_controller.rb

class Api::V1::AnswersController < ApplicationController
  before_action :set_answer, only: [:show, :update, :destroy, :toggle_like]
  skip_before_action :authenticate_user!

  # GET /api/v1/answers/users_by_more_answers
  # Retrieves all users ordered by the highest number of answers.
  def users_by_more_answers
    top_users = User.joins(:answers)
                    .group(:id)
                    .order('COUNT(answers.id) DESC')
                    .pluck(:id, :email, 'COUNT(answers.id) as total_answers')

    top_users_objects = top_users.map { |user| { id: user[0], email: user[1], total_answers: user[2] } }

    render json: { users_by_more: top_users_objects }
  end

  # GET /api/v1/answers/top_users
  # Retrieves all users ordered by the highest sum of answer_points.
  def top_users
    top_users = User.joins(:answers)
                   .group(:id)
                   .order('SUM(answers.answer_points) DESC')
                   .pluck(:id, :email, 'SUM(answers.answer_points) as total_points')

    top_users_objects = top_users.map { |user| { id: user[0], email: user[1], total_points: user[2] } }

    render json: { top_users: top_users_objects }
  end

  # POST /api/v1/answers/toggle_like
  # Toggles the like status for an answer by a user.
  def toggle_like
    @user = User.find_by(id: params[:user][:id])

    if @user&.answer_liked?(@answer)
      @user.unlike_answer(@answer)
      @answer.reload
      render json: { message: 'Answer unliked successfully', answer_points: @answer.answer_points }
    else
      @user.like_answer(@answer)
      @answer.reload
      render json: { message: 'Answer liked successfully', answer_points: @answer.answer_points }
    end
  end

  # GET /api/v1/answers
  # Retrieves a list of all answers for a specific question, including user details.
  def index
    @question = Question.find(params[:question_id])
    @answers = @question.answers.includes(:user)
    render json: @answers.as_json(include: { user: { only: [:id, :name] } })
  end

  # GET /api/v1/answers/1
  # Retrieves detailed information about a specific answer.
  def show
    render json: @answer
  end

  # POST /api/v1/answers
  # Creates a new answer based on provided parameters.
  # Request Parameters: body, answer_points, user_id, question_id, resource_url
  def create
    @answer = Answer.new(answer_params)

    if @answer.save
      render json: @answer, status: :created
    else
      Rails.logger.error "Error creating answer: #{answer.errors.full_messages.to_sentence}"
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/answers/1
  # Updates answer information based on provided parameters.
  def update
    if @answer.update(answer_params)
      render json: @answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/answers/1
  # Deletes an answer.
  def destroy
    @answer.destroy
    render json: { message: 'Answer deleted successfully' }
  end

  private

  # Finds and sets the @answer instance variable based on the provided id.
  def set_answer
    @answer = Answer.find(params[:id])
  end

  # Defines permitted answer parameters for mass assignment.
  def answer_params
    params.require(:answer).permit(:body, :answer_points, :user_id, :question_id, :resource_url)
  end
end
