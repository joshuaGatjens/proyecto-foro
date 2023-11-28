class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  skip_before_action :authenticate_user!,only:[:index, :show]

  # GET /api/v1/users
  def index
    @users = User.all.map { |user| { id: user.id, name: user.name, email: user.email, description: user.description } }
    render json: @users
  end

  # GET /api/v1/users/1
  
  def show
    @user = User.find_by(id: params[:id])
  
    unless @user
      render json: { error: 'Usuario no encontrado' }, status: :not_found
      return
    end
  
    user_data = {
      id: @user.id,
      name: @user.name,
      email: @user.email,
      description: @user.description
    }
  
    questions = @user.questions
  
    render json: { user: user_data, questions: questions }
  end
  
  # POST /api/v1/users
  def create
    user = User.new(user_params)

    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/users/1
  def update
    if user_params[:avatar]
      @user.avatar.attach(user_params[:avatar])
    end

    if @user.update(user_params.except(:avatar))
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/users/1
  def destroy
    @user.destroy
    render json: { message: 'User deleted successfully' }
  end


  def auth_status
    render json: { user_signed_in: user_signed_in?, current_user: current_user }
  end
  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :description, :email, :encrypted_password, :avatar)
    end
end
