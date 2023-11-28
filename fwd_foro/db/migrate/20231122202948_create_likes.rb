# db/migrate/xxxxxxxxxx_create_likes.rb
class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end

    add_index :likes, [:user_id, :question_id], unique: true
  end
end
