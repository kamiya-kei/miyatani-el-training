FactoryBot.define do
  factory :user do
    name { Faker::Name.last_name + Faker::Name.first_name }
    password { 'abc123' }
    password_confirmation { password }
    role_id { Role::REGULAR }
  end
end
