# db/migrate/20231129164001_change_comments_table.rb

class ChangeCommentsTable < ActiveRecord::Migration[7.0]
  def change
    # Elimina la columna 'question_id' si existe
    # remove_column :comments, :question_id, :bigint if column_exists?(:comments, :question_id)

    # Agrega las columnas para la relación polimórfica
    add_reference :comments, :commentable, polymorphic: true, index: true
  end
end
