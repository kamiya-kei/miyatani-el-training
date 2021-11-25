class Role < ActiveHash::Base
  REGULAR = 0
  ADMIN   = 1

  self.data = [
    { id:  self::REGULAR, text: 'regular' },
    { id:  self::ADMIN,   text: 'admin' }
  ]

  include ActiveHash::Associations
  has_many :users, dependent: :restrict_with_error
end
