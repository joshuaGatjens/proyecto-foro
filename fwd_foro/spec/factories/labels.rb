# spec/factories/labels.rb
FactoryBot.define do
  factory :label do
    sequence(:name) { |n| "MyString#{n}" } # Ensure this is unique for each instance
    description { "MyTextMyText" } # Ensure this is at least 10 characters long
  end
end