class CreateWebtickets < ActiveRecord::Migration
  def change
    create_table :webtickets do |t|
      t.date :date
      t.string :title

      t.timestamps null: false
    end
  end
end
