# spec/factories/votes.rb
FactoryBot.define do
    factory :vote do
      user
      votable { association(:question) }
      value { 1 }
    end
  end