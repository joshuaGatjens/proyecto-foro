# db/migrate/xxxxxxxxxx_remove_avatar_from_users.rb

class RemoveAvatarFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :avatar_id
  end
end
