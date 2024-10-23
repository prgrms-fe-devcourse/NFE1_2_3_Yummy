import { formatDate } from '@/utils/formatDate'
import {
  AuthorDetail,
  Dot,
  PostContent,
  PostDetail,
  PostInfo,
  PostPagePostCardContainer,
} from './style'

const PostPagePostCard = () => {
  return (
    <PostPagePostCardContainer>
      <PostInfo>
        <p>해산물 요리</p>
        <h1>"오늘은 물고기 요리로 건강하고 맛있는 식탁을 만들어보세요!"</h1>
        <PostDetail>
          <AuthorDetail>
            <img
              src='https://static.inews24.com/v1/0ea0b53518da00.jpg'
              alt='Author'
            />
            <span>애드워드 리</span>
          </AuthorDetail>
          <Dot>·</Dot>
          <p>{formatDate(new Date())}</p>
        </PostDetail>
      </PostInfo>

      <PostContent>
        {`여름이 다가오면 바다의 신선한 생선을 떠올리는 일이 많아지죠.
물고기 요리는 다양한 맛과 풍부한 영양으로 많은 사람들의 사랑을 받습니다.
특히 집에서 간편하게 만들 수 있는 요리로는 구이, 찜, 조림 등 여러 가지 방법이 있는데,
이번 포스팅에서는 건강하고 맛있는 물고기 요리를 소개하려고 합니다.

1. 간단한 생선구이
생선구이는 물고기 요리 중 가장 손쉽고 간편한 방법 중 하나입니다.
신선한 생선에 소금과 후추를 뿌리고, 팬에 올리브유를 두른 후 노릇하게 구워내면 완성됩니다.
바삭한 껍질과 촉촉한 속살이 어우러진 생선구이는 별다른 양념 없이도 깊은 맛을 느낄 수 있습니다.
특히, 고등어나 연어 같은 기름진 생선은 구워 먹기에 아주 좋습니다.

2. 담백한 생선찜
생선찜 요리는 생선의 고유한 맛을 그대로 살릴 수 있는 요리법입니다.
양파, 마늘, 생강과 같은 채소와 함께 생선을 찜통에 넣고 10~15분 정도 쪄주면 됩니다.
쪄낸 생선은 부드럽고 담백한 맛이 일품이며, 간장 베이스의 양념을 곁들여 먹으면 더욱 맛있습니다.
흰살생선인 도미나 광어가 찜 요리로 많이 사용됩니다.

3. 매콤한 생선조림
매콤한 양념으로 생선을 조려 먹는 것도 인기 있는 방법입니다.
고추장, 간장, 설탕, 다진 마늘을 넣어 만든 양념장에 생선을 넣고 은근한 불에서 졸이면
매콤하면서도 감칠맛이 가득한 생선조림이 완성됩니다.
특히, 조림에는 꽁치나 갈치와 같은 생선이 잘 어울리며,
무나 감자를 함께 넣어 조리면 더욱 풍성한 맛을 즐길 수 있습니다.

결론
물고기 요리는 건강에 좋을 뿐만 아니라 요리하기도 비교적 간단해요.
다양한 조리법을 활용해 가정에서 신선한 바다의 맛을 즐겨보세요.
다음 포스팅에서는 좀 더 색다른 생선 요리법을 소개할 테니 기대해주세요!`}
      </PostContent>
    </PostPagePostCardContainer>
  )
}

export default PostPagePostCard
