# File: app/controllers/api/v1/comments_controller.rb

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :find_comment, only: [:show, :update, :destroy]
      before_action :find_commentable, only: [:create]
      skip_before_action :authenticate_user!

      # GET /api/v1/comments
      # Retrieves a list of all comments in descending order based on their IDs.
      def index
        @comments = Comment.order(id: :desc)
        render json: @comments.as_json(include: { user: { only: [:name] } })
      end

      # GET /api/v1/comments/1
      # Retrieves detailed information about a specific comment.
      def show
        render json: @comment
      end

      # POST /api/v1/comments
      # Creates a new comment based on provided parameters.
      # Request Parameters: body, user_id, commentable_type, commentable_id
      def create
        user_id = comment_params[:user_id]
        user = User.find_by(id: user_id)

        if user
          @comment = @commentable.comments.build(comment_params)
          @comment.user_id

          if @comment.save
            render json: @comment, status: :created
          else
            render json: @comment.errors, status: :unprocessable_entity
          end
        else
          render json: { error: 'User not found' }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/comments/1
      # Updates comment information based on provided parameters.
      def update
        if @comment.update(comment_params)
          render json: @comment
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/comments/1
      # Deletes a comment.
      def destroy
        @comment.destroy
        render json: { message: 'Comment deleted successfully' }
      end

      private

      # Finds and sets the @commentable instance variable based on the provided parameters.
      def find_commentable
        if params[:answer_id]
          @commentable = Answer.find(params[:answer_id])
        elsif params[:question_id]
          @commentable = Question.find(params[:question_id])
        else
          render json: { error: 'Commentable not found' }, status: :not_found
        end
      end

      # Finds and sets the @comment instance variable based on the provided id.
      def find_comment
        @comment = Comment.find(params[:id])
      end

      # Defines permitted comment parameters for mass assignment.
      def comment_params
        params.require(:comment).permit(:body, :user_id, :commentable_type, :commentable_id)
      end
    end
  end
end
