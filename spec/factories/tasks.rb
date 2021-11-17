FactoryBot.define do
  factory :task do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.sentence }
    deadline { '2021-01-01 00:00:00' }
    done_id { Done.pluck(:id).sample }
    priority_number { [0, 1, 2].sample }
  end
end
