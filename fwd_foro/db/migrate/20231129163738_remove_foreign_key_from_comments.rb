class RemoveForeignKeyFromComments < ActiveRecord::Migration[7.0]
  def up
    # Verifica si la referencia extranjera existe antes de intentar eliminarla
    remove_reference :comments, :question, foreign_key: true if foreign_key_exists?(:comments, :question)
  end

  def down
    # Agrega nuevamente la referencia extranjera
    add_reference :comments, :question, null: false, foreign_key: true
  end

  private

  def foreign_key_exists?(table, column)
    foreign_keys = ActiveRecord::Base.connection.foreign_keys(table)
    foreign_keys.any? { |fk| fk.column == column.to_s }
  end
end
