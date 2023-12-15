class RenameDescripcionToDescriptionInLabels < ActiveRecord::Migration[7.0]  # Asegúrate de usar la versión correcta de ActiveRecord

  def change
    rename_column :labels, :descripcion, :description
  end

end
