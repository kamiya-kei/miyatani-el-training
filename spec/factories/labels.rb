FactoryBot.define do
  factory :label do
    name { Faker::Lorem.sentence }
    association :user
  end
end
