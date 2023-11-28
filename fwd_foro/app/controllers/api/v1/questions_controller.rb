class Api::V1::QuestionsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_question, only: [:show, :update, :destroy, :toggle_like]
  skip_before_action :authenticate_user!, only:[:index, :show,:toggle_like,:create]
  # , only: [ :toggle_like, :index,:show]

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

  def index
      questions = Question.includes(:user).all
      render json: questions.as_json(
        only: [:id, :title, :body, :question_points],
        include: { user: { only: [:name] } }
      )
  end

def show
  if @question
    render json: @question.as_json(
      only: [:id, :title, :body, :question_points],
      include: { user: { only: [:name] } }
    )
  else
    render json: { error: 'Pregunta no encontrada' }, status: :not_found
  end
end


  # POST /api/v1/questions
  def create
    @question = Question.new(question_params)

    if @question.save
      render json: @question, status: :created
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/questions/1
  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/questions/1
  def destroy
    @question.destroy
    render json: { message: 'Question deleted successfully' }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def unauthenticated
    !user_signed_in?
  end
  
  def set_question
    @question = Question.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def question_params
    params.require(:question).permit(:title, :body, :question_points, :d,:user_id)
  end
end
