FactoryBot.define do
    factory :comment do
      id { 1 }
      user_id { 1 }
      commentable_type { 'Answer' }
      commentable_id { 1 }
      body {'good idea'}
    end
  end