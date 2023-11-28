class Api::V1::LabelsController < ApplicationController
    before_action :set_label, only: [:show, :update, :destroy]

  # GET /api/v1/labels
  def index
    @labels = Label.all
    render json: @labels
  end

  # GET /api/v1/labels/1
  def show
    render json: @label
  end

  # POST /api/v1/labels
  def create
    @label = Label.new(label_params)

    if @label.save
      render json: @label, status: :created
    else
      render json: @label.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/labels/1
  def update
    if @label.update(label_params)
      render json: @label
    else
      render json: @label.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/labels/1
  def destroy
    @label.destroy
    render json: { message: 'Label deleted successfully' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_label
      @label = Label.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def label_params
      params.require(:label).permit(:name, :description)
    end
end
