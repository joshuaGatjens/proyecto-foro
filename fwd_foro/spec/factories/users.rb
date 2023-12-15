# spec/factories/users.rb
FactoryBot.define do
    factory :user do
      email { Faker::Internet.email }
      password { Faker::Internet.password(min_length: 10, max_length: 20) }
      password_confirmation { password }
      # cualquier otro atributo que necesites
    end
  end