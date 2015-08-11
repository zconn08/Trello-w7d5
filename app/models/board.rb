class Board < ActiveRecord::Base
  validates :title, presence: true
  has_many :lists, -> { order :ord }
end
