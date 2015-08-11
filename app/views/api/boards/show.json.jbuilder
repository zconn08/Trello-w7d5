json.extract! @board, :id, :title

json.lists @board.lists do |list|
  json.extract! list, :id, :name, :ord
  json.cards list.cards do |card|
    json.extract! card, :id, :title, :description
  end
end
