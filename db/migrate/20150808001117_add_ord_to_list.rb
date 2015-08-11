class AddOrdToList < ActiveRecord::Migration
  def change
    add_column :lists, :ord, :integer
  end
end
