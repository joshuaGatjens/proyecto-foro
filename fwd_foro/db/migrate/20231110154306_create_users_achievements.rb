class CreateUsersAchievements < ActiveRecord::Migration[7.0]
  def change
    create_table :users_achievements, id: false do |t|
      t.references :user, foreign_key: true
      t.references :achievement, foreign_key: true
    end
  end
end
