class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :ord, null: false
      t.integer :list_id, null: false, index: true
      t.timestamps null: false
    end
  end
end
