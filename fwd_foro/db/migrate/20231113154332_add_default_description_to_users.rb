
class AddDefaultDescriptionToUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_default :users, :description, 'El código es como un chiste: si tienes que explicarlo, probablemente no es muy bueno.' 
  end
end
