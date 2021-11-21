FactoryBot.define do
  factory :user do
    name { Faker::Name.last_name }
    password { 'abc123' }
    password_confirmation { password }
  end
end