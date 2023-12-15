class CreateAchievements < ActiveRecord::Migration[7.0]
  def change
    create_table :achievements do |t|
      t.string :name
      t.string :description
      t.string :requirements

      t.timestamps
    end
  end
end
