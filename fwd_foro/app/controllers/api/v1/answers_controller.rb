class Api::V1::AnswersController < ApplicationController
    before_action :set_answer, only: [:show, :update, :destroy]
    skip_before_action :authenticate_user!
  # GET /api/v1/answers
  def index
    @answers = Answer.all
    render json: @answers
  end

  # GET /api/v1/answers/1
  def show
    render json: @answer
  end

  # POST /api/v1/answers
  def create
    @answer = Answer.new(answer_params)

    if @answer.save
      render json: @answer, status: :created
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/answers/1
  def update
    if @answer.update(answer_params)
      render json: @answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/answers/1
  def destroy
    @answer.destroy
    render json: { message: 'Answer deleted successfully' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def answer_params
      params.require(:answer).permit(:body, :answer_points, :user_id, :question_id)
    end
end
