class List < ActiveRecord::Base
  validates :name, :board_id, presence: true
  belongs_to :board
  has_many :cards
end
