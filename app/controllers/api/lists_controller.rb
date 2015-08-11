class Api::ListsController < ApplicationController
  def index
    lists = List.all
    render json: lists
  end

  def create
    list = List.new(list_params)
    list.ord = List.all.count + 1
    if list.save
      render json: list
    else
      render json: list.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    list = List.find(params[:id])
    render json: list
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    render json: list
  end

  def update
    list = List.find(params[:id])
    if list.update_attributes(list_params)
      render json: list
    else
      render json: list.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def list_params
    params.permit(:name, :board_id, :ord)
  end
end
