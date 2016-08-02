class CreateReviews < ActiveRecord::Migration
  def up
    create_table :reviews do |t|
      t.string :product_id
      t.string :user
      t.integer :rating
      t.text :body

      t.timestamps null: false
    end
  end
  def down
  	drop_table
  end
end
