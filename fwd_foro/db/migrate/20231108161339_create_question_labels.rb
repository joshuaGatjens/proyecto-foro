class CreateQuestionLabels < ActiveRecord::Migration[7.0]
  def change
    create_table :question_labels do |t|
      t.references :question, null: false, foreign_key: true
      t.references :label, null: false, foreign_key: true

      t.timestamps
    end
  end
end
