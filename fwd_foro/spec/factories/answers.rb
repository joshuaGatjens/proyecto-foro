# spec/factories/answers.rb
FactoryBot.define do
  factory :answer do
    body { Faker::Lorem.paragraph }
    question
    user
  end
end