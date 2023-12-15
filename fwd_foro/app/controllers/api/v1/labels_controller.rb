# File: app/controllers/api/v1/labels_controller.rb

class Api::V1::LabelsController < ApplicationController
  before_action :set_label, only: [:show, :update, :destroy]
  skip_before_action :authenticate_user!

  # GET /api/v1/labels
  # Retrieves a list of all labels.
  def index
    @labels = Label.all
    render json: @labels
  end

  # GET /api/v1/labels/1
  # Retrieves detailed information about a specific label.
  def show
    render json: @label
  end

  # POST /api/v1/labels
  # Creates a new label based on provided parameters.
  # Request Parameters: name, description
  def create
    @label = Label.new(label_params)

    if @label.save
      render json: @label, status: :created
    else
      render json: @label.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/labels/1
  # Updates label information based on provided parameters.
  def update
    if @label.update(label_params)
      render json: @label
    else
      render json: @label.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/labels/1
  # Deletes a label.
  def destroy
    @label.destroy
    render json: { message: 'Label deleted successfully' }
  end

  private

  # Finds and sets the @label instance variable based on the provided id.
  def set_label
    @label = Label.find(params[:id])
  end

  # Defines permitted label parameters for mass assignment.
  def label_params
    params.require(:label).permit(:name, :description)
  end
end
