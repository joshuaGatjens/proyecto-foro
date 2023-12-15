class RenameDescripcionToDescriptionInUsers < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :descripcion, :description
  end
end
