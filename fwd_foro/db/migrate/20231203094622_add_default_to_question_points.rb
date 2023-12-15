
class AddDefaultToQuestionPoints < ActiveRecord::Migration[7.0]
  def change
    change_column :questions, :question_points, :integer, default: 0
  end
end
