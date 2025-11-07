import styled from "styled-components";

export const Container = styled.div`
  color: #ffffff;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

export const WriteButton = styled.button`
  padding: 10px 20px;
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const SearchInput = styled.input`
  flex: 1;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #666666;
  }

  &:focus {
    border-color: #ffffff;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterGroup = styled.div`
  flex: 1;
  min-width: 150px;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PostItem = styled.div<{ $isVisible: boolean }>`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.5s ease;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.$isVisible ? 0 : "30px")});

  &:hover {
    border-color: #ffffff;
    transform: translateY(-2px);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`;

export const PostTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
  flex: 1;
`;

export const CategoryBadge = styled.span<{ $category: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  background: ${(props) => {
    switch (props.$category) {
      case "NOTICE":
        return "#ff6b6b";
      case "QNA":
        return "#4dabf7";
      case "FREE":
        return "#51cf66";
      default:
        return "#999999";
    }
  }};
  color: #000000;
`;

export const PostBody = styled.p`
  color: #b0b0b0;
  font-size: 14px;
  margin: 0 0 12px 0;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const TagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
`;

export const Tag = styled.span`
  padding: 4px 8px;
  background: #2a2a2a;
  border-radius: 4px;
  font-size: 12px;
  color: #999999;
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

export const AuthorId = styled.span`
  font-size: 12px;
  color: #b0b0b0;
  font-weight: 500;
`;

export const Divider = styled.span`
  font-size: 12px;
  color: #666666;
`;

export const PostDate = styled.span`
  font-size: 12px;
  color: #666666;
`;

export const LoadingMoreMessage = styled.div`
  text-align: center;
  color: #b0b0b0;
  font-size: 14px;
  padding: 20px;
`;

export const ScrollObserver = styled.div`
  height: 20px;
  margin-top: 20px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  color: #b0b0b0;
  font-size: 16px;
  padding: 40px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 16px;
  padding: 40px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: #666666;
  font-size: 16px;
  padding: 40px;
`;
