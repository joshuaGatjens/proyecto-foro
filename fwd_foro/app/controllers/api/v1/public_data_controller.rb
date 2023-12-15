# app/controllers/api/v1/public_data_controller.rb
class Api::V1::PublicDataController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :set_question, only: [:show]

  # GET /api/v1/public_data/questions
  def index
    questions = Question.includes(:user).all
    render json: questions.map { |question| { id: question.id, title: question.title, body: question.body, question_points: question.question_points, user: { name: question.user.name } } }
  end

  # GET /api/v1/public_data/questions/1
  def show
    if @question
      render json: @question.slice(:id, :title, :body, :question_points)
    else
      render json: { error: 'Pregunta no encontrada' }, status: :not_found
    end
  end

  private

  def set_question
    @question = Question.find_by(id: params[:id])
  end
end
