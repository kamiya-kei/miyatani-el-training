FactoryBot.define do
  factory :label do
    title { Faker::Lorem.sentence }
    association :user
  end
end
