class AddUserLikedToQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :user_liked, :boolean
  end
end
