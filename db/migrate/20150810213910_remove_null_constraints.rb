class RemoveNullConstraints < ActiveRecord::Migration
  def change
    change_column :cards, :ord, :integer, null: true
    change_column :cards, :description, :text, null: true
  end
end
