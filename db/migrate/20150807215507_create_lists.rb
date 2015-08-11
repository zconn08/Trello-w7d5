class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.integer :board_id, null: false, index: true
      t.timestamps null: false
    end
    add_column :boards, :user_id, :integer, index: true
  end
end
