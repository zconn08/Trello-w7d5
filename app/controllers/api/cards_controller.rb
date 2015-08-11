class Api::CardsController < ApplicationController
  def index
    cards = Card.all
    render json: cards
  end

  def create
    card = Card.new(card_params)
    if card.save
      render json: card
    else
      render json: card.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    card = List.find(params[:id])
    render json: card
  end

  def destroy
    card = List.find(params[:id])
    card.destroy
    render json: card
  end

  private

  def card_params
    params.permit(:title, :description, :list_id)
  end
end
