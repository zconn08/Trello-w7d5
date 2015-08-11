class Api::BoardsController < ApplicationController
  def index
    render json: Board.all
  end

  def create
    board = Board.create(board_params)
    if board.save
      render json: board
    else
      render json: board.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @board = Board.find(params[:id])
  end

  def destroy
    board = Board.find(params[:id])
    board.destroy
    render json: board
  end

  private
  def board_params
    params.require(:board).permit(:title, :user_id)
  end

end
