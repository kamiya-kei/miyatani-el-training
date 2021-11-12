FactoryBot.define do
  factory :task do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.sentence }
    deadline { '2021-01-01 00:00:00' }
  end
end
