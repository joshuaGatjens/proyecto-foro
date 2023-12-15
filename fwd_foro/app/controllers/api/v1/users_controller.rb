# File: app/controllers/api/v1/users_controller.rb

class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :avatar]
  skip_before_action :authenticate_user!

  # GET /api/v1/users/1/avatar
  # Retrieves avatar information for a user, including attachments and associated URLs.
  def avatar
    avatar_info = @user.attachments.map do |attachment|
      blob = attachment.blob
      {
        attachment_id: attachment.id,
        user_id: @user.id,
        avatar: rails_blob_url(@user.avatar)
      }
    end

    render json: { avatars: avatar_info }
  end

  # PATCH /api/v1/users/1/update_avatar
  # Updates the user's avatar based on the provided image.
  # Request Parameters: avatar (Image file)
  def update_avatar
    @user = User.find(params[:id])

    if user_params[:avatar]
      @user.avatar.attach(user_params[:avatar])
      render json: { message: 'Avatar updated successfully', avatar_url: url_for(@user.avatar) }
    else
      render json: { error: 'No se proporcionó una imagen válida' }, status: :unprocessable_entity
    end
  end

  # GET /api/v1/users/1/questions
  # Retrieves questions associated with a user, including relevant details and labels.
  def questions
    @user = User.find(params[:id])
    questions = @user.questions.includes(:labels)
    questions_info = questions.map do |question|
      {
        id: question.id,
        user_id: question.user_id,
        name: @user.name,
        title: question.title,
        body: question.body,
        question_points: question.question_points,
        labels: question.labels.map { |label| { id: label.id, name: label.name } }
      }
    end
    render json: { questions: questions_info }
  end

  # GET /api/v1/users_more_active
  # Retrieves information about the top 5 most active users based on questions, comments, and answers.
  def users_more_active
    users = User.includes(:questions, comments: :question, answers: :question).all

    users_info = users.map do |user|
      {
        id: user.id,
        name: user.name,
        email: user.email,
        total_questions: user.questions.count,
        total_comments: user.comments.count,
        total_answers: user.answers.count
      }
    end

    # Sort the list of users by the total of questions, comments, and answers combined in descending order
    sorted_users_info = users_info.sort_by { |user| -(user[:total_questions] + user[:total_comments] + user[:total_answers]) }

    # Take only the top 5 most active users
    top_5_users_info = sorted_users_info.take(5)

    render json: { users_more_active: top_5_users_info }
  end

  # GET /api/v1/users
  # Retrieves a list of all users with basic information.
  def index
    @users = User.all.map { |user| user_data(user) }
    render json: @users
  end

  # GET /api/v1/users/1
  # Retrieves detailed information about a specific user, including associated questions.
  def show
    unless @user
      render json: { error: 'Usuario no encontrado' }, status: :not_found
      return
    end

    user_info = user_data(@user)
    user_questions = @user.questions.includes(:labels)
    questions_info = user_questions.map do |question|
      {
        id: question.id,
        user_id: question.user_id,
        title: question.title,
        body: question.body,
        question_points: question.question_points,
        labels: question.labels.map { |label| { id: label.id, name: label.name } }
      }
    end

    render json: { user: user_info, questions: questions_info }
  end

  # POST /api/v1/users
  # Creates a new user based on provided parameters.
  # Request Parameters: name, description, email, encrypted_password, avatar (Image file)
  def create
    user = User.new(user_params)

    if user.save
      render json: user_data(user), status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/users/1
  # Updates user information, including the avatar if provided.
  # Request Parameters: name, description, email, encrypted_password, avatar (Image file)
  def update
    if user_params[:avatar].present?
      @user.avatar.attach(user_params[:avatar])
    end

    if @user.update(user_params.except(:avatar))
      render json: user_data(@user)
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/users/1
  # Deletes a user.
  def destroy
    @user.destroy
    render json: { message: 'User deleted successfully' }
  end

  # GET /api/v1/auth_status
  # Retrieves the authentication status, indicating whether a user is signed in and the current user details.
  def auth_status
    render json: { user_signed_in: user_signed_in?, current_user: current_user }
  end

  private

  # Finds and sets the @user instance variable based on the provided id.
  def set_user
    @user = User.find_by(id: params[:id])

    # If the user is not found, you can return a specific error or an empty result, depending on your needs.
    render json: { error: 'Usuario no encontrado' }, status: :not_found unless @user
  end

  # Defines permitted user parameters for mass assignment.
  def user_params
    params.require(:user).permit(:name, :description, :email, :encrypted_password, :avatar)
  end

  # Constructs a hash of basic user information.
  def user_data(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      avatar: user.avatar.attached? ? url_for(user.avatar) : nil
    }
  end
end
