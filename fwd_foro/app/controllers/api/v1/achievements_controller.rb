# File: app/controllers/api/v1/achievements_controller.rb

class Api::V1::AchievementsController < ApplicationController
  before_action :set_achievement, only: [:show, :update, :destroy]

  # GET /api/v1/achievements
  # Retrieves a list of all achievements.
  def index
    @achievements = Achievement.all
    render json: @achievements
  end

  # GET /api/v1/achievements/1
  # Retrieves detailed information about a specific achievement.
  def show
    render json: @achievement
  end

  # POST /api/v1/achievements
  # Creates a new achievement based on provided parameters.
  # Request Parameters: name, description, requirements
  def create
    @achievement = Achievement.new(achievement_params)

    if @achievement.save
      render json: @achievement, status: :created
    else
      render json: @achievement.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/achievements/1
  # Updates achievement information based on provided parameters.
  def update
    if @achievement.update(achievement_params)
      render json: @achievement
    else
      render json: @achievement.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/achievements/1
  # Deletes an achievement.
  def destroy
    @achievement.destroy
    render json: { message: 'Achievement deleted successfully' }
  end

  private

  # Finds and sets the @achievement instance variable based on the provided id.
  def set_achievement
    @achievement = Achievement.find(params[:id])
  end

  # Defines permitted achievement parameters for mass assignment.
  def achievement_params
    params.require(:achievement).permit(:name, :description, :requirements)
  end
end
