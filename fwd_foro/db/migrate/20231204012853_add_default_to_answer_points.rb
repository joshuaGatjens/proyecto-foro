class AddDefaultToAnswerPoints < ActiveRecord::Migration[7.0]
  def change
    change_column :answers, :answer_points, :integer, default: 0
  end
end
