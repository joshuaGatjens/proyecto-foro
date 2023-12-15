class AddResourceUrlToAnswers < ActiveRecord::Migration[7.0]
  def change
    add_column :answers, :resource_url, :string
  end
end
