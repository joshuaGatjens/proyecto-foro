# db/migrate/xxxxxxxxxx_add_avatar_to_users.rb

class AddAvatarToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :avatar, :string
  end
end
