# spec/models/label_spec.rb
require 'rails_helper'
RSpec.describe Label, type: :model do
  subject { FactoryBot.create(:label) }

  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_least(3).is_at_most(50) }
  it { should validate_presence_of(:description) }
  it { should validate_length_of(:description).is_at_least(10).is_at_most(300) }
  it { should have_and_belong_to_many(:questions) }
end