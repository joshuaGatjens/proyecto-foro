class Api::V1::AchievementsController < ApplicationController
    before_action :set_achievement, only: [:show, :update, :destroy]

  # GET /api/v1/achievements
  def index
    @achievements = Achievement.all
    render json: @achievements
  end

  # GET /api/v1/achievements/1
  def show
    render json: @achievement
  end

  # POST /api/v1/achievements
  def create
    @achievement = Achievement.new(achievement_params)

    if @achievement.save
      render json: @achievement, status: :created
    else
      render json: @achievement.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/achievements/1
  def update
    if @achievement.update(achievement_params)
      render json: @achievement
    else
      render json: @achievement.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/achievements/1
  def destroy
    @achievement.destroy
    render json: { message: 'Achievement deleted successfully' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_achievement
      @achievement = Achievement.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def achievement_params
      params.require(:achievement).permit(:name, :description, :requirements)
    end
end
