class Card < ActiveRecord::Base
  validates :title, :list_id, presence: true
  belongs_to :list
end
